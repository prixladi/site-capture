import React from 'react';
import { Box, Grid, Heading, Icon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Text from '../../components/Text';
import QualitySlider from '../../components/QualitySlider';
import Button from '../../components/Button';
import ViewportInputs, { Viewport } from '../../components/ViewportInputs';
import { useCreateTemplateMutation } from '../../graphql';
import { TemplateRoute } from '../../routes';
import { FaPlus } from 'react-icons/fa';
import { WideContent } from '../../components/Content';
import { useRouter } from 'next/router';
import NameInput from '../../components/NameInput';
import DefaultSkeleton from '../../components/DefaultSkeleton';
import withAuthentication from '../../hoc/withAuthentication';
import { useAuthorityManager } from '../../authority';
import { templateOnCreateUpdate } from '../../services/mutationService';
import { templateCreatedNotification } from '../../services/notificationService';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';

type Values = {
  name: string;
  quality: number;
  viewports: Viewport[];
};

const defaultValues: Values = {
  name: '',
  quality: 100,
  viewports: [],
};

const NewTemplate: React.FC = () => {
  const [createTemplate, { error }] = useCreateTemplateMutation();

  const manager = useAuthorityManager();
  const router = useRouter();
  const { handleGqlError } = useApolloErrorHandling(error);

  const { handleSubmit, register, control, errors, formState } = useForm<Values>({ defaultValues });

  const onSubmit = async (values: Values): Promise<void> => {
    const { data, errors } = await createTemplate({
      variables: { template: values },
      update: templateOnCreateUpdate(manager.getUserProfile()?.id),
    });

    if (!data) {
      handleGqlError(errors);
      return;
    }

    templateCreatedNotification();
    await router.push(TemplateRoute(data.template.create.id));
  };

  return (
    <WideContent>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          New Template
        </Heading>
        <Text>Create new template that you can later use for creating new sites.</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridGap="1em">
          <NameInput errorMessage={errors.name?.message} register={register} />
          <QualitySlider register={register} />
          <ViewportInputs errors={errors.viewports} register={register} control={control} />
          <Button submit isLoading={formState.isSubmitting}>
            <Icon mr="0.2em" as={FaPlus} />
            Create template
          </Button>
        </Grid>
      </form>
    </WideContent>
  );
};

// This is here for Fast refresh to work as intended
// https://github.com/vercel/next.js/issues/13024
const AuthenticatedPage = withAuthentication(NewTemplate, DefaultSkeleton);
const NewTemplatePage: React.FC = () => <AuthenticatedPage />;

export default NewTemplatePage;
