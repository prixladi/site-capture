import { Button, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaMap } from 'react-icons/fa';
import { useAuthorityManager } from '../../authority';
import { SiteFieldsFragment, useCreateTemplateMutation } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { templateOnCreateUpdate } from '../../services/mutationService';
import { templateCreatedNotification } from '../../services/notificationService';

type Props = {
  site: SiteFieldsFragment;
};

const DeleteSiteButton: React.FC<Props> = ({ site }: Props) => {
  const [createTemplate, { error }] = useCreateTemplateMutation();

  const [loading, setLoading] = useState(false);
  const manager = useAuthorityManager();
  const { handleGqlError } = useApolloErrorHandling(error);

  const onExtractTemplate = async () => {
    setLoading(true);
    const { errors } = await createTemplate({
      variables: {
        template: {
          name: site.name,
          quality: site.quality,
          viewports: site.viewports.map((vp) => ({ width: vp.width, height: vp.height })),
        },
      },
      update: templateOnCreateUpdate(manager.getUserProfile()?.id),
    });

    if (errors) {
      handleGqlError(errors);
    } else {
      templateCreatedNotification();
    }

    setLoading(false);
  };

  return (
    <Button isLoading={loading} onClick={onExtractTemplate} maxW="11em" minW="11em" colorScheme="blue" fontSize="1.3em">
      <Icon mr="0.2em" as={FaMap} /> Extract template
    </Button>
  );
};

export default DeleteSiteButton;
