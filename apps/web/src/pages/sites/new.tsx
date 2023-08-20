import React, { useState } from 'react';
import { Box, Flex, Grid, Heading, Icon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Text from '../../components/Text';
import QualitySlider, { ForcedQuality } from '../../components/QualitySlider';
import UrlInput from '../../components/UrlInput';
import Button from '../../components/Button';
import ViewportInputs, { Viewport } from '../../components/ViewportInputs';
import { TemplateFieldsFragment, useCreateSiteMutation } from '../../graphql';
import { SiteRoute } from '../../routes';
import { FaPlus } from 'react-icons/fa';
import { WideContent } from '../../components/Content';
import { useRouter } from 'next/router';
import NameInput from '../../components/NameInput';
import SubsitesInput, { Subsite } from '../../components/SubsitesInput';
import DefaultSkeleton from '../../components/DefaultSkeleton';
import withAuthentication from '../../hoc/withAuthentication';
import { useAuthorityManager } from '../../authority';
import { siteOnCreateUpdate } from '../../services/mutationService';
import { siteCreatedNotification } from '../../services/notificationService';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import SelectTemplate from '../../components/templatePage/SelectTemplate';
import useCompactLayout from '../../hooks/useCompactLayout';

type Values = {
  url: string;
  name: string;
  quality: number;
  viewports: Viewport[];
  subsites: Subsite[];
};

const defaultValues: Values = {
  url: '',
  name: '',
  quality: 100,
  viewports: [],
  subsites: [],
};

const NewSite: React.FC = () => {
  const [createSite, { error }] = useCreateSiteMutation();

  const manager = useAuthorityManager();
  const router = useRouter();
  const { handleGqlError } = useApolloErrorHandling(error);
  const isCompact = useCompactLayout();
  const [forcedQuality, setForcedQuality] = useState(null as ForcedQuality | null);

  const { handleSubmit, register, control, errors, setValue, formState } = useForm<Values>({ defaultValues });

  const fillFromTemplate = (template: TemplateFieldsFragment) => {
    setValue('quality', template.quality);
    setValue('viewports', template.viewports);
    setForcedQuality({ value: template.quality });
  };

  const onSubmit = async (values: Values) => {
    const transformedValues = {
      ...values,
      subsites: values.subsites ? values.subsites.map((sub) => sub.value) : [],
    };

    const { data, errors } = await createSite({
      variables: { site: transformedValues },
      update: siteOnCreateUpdate(manager.getUserProfile()?.id),
    });

    if (!data) {
      handleGqlError(errors);
      return;
    }

    siteCreatedNotification();
    await router.push(SiteRoute(data.site.create.id));
  };

  return (
    <WideContent>
      <Flex display={['grid', 'flex', 'flex', 'flex']} gridGap="1em" justifyContent="space-between" mb="2em">
        <Box maxW={['25em', '25em', '30em', '30em']} mb={isCompact ? '1em' : undefined}>
          <Heading as="h1" mb="0.5em">
            New Site
          </Heading>
          <Text>Create new site that you can later reuse.</Text>
        </Box>
        <Grid gridGap="1.5em">
          <SelectTemplate fillFromTemplate={fillFromTemplate} />
        </Grid>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridGap="1em">
          <NameInput errorMessage={errors.name?.message} register={register} />
          <UrlInput errorMessage={errors.url?.message} register={register} />
          <QualitySlider forcedQuality={forcedQuality} register={register} />
          <SubsitesInput errors={errors.subsites} register={register} control={control} />
          <ViewportInputs errors={errors.viewports} register={register} control={control} />
          <Button submit isLoading={formState.isSubmitting}>
            <Icon mr="0.2em" as={FaPlus} />
            Create site
          </Button>
        </Grid>
      </form>
    </WideContent>
  );
};

// This is here for Fast refresh to work as intended
// https://github.com/vercel/next.js/issues/13024
const AuthenticatedPage = withAuthentication(NewSite, DefaultSkeleton);
const NewSitePage: React.FC = () => <AuthenticatedPage />;

export default NewSitePage;
