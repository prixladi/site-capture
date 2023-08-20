import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAuthorityManager } from '../../authority';
import { useDeleteTemplateMutation } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { TemplatesRoute } from '../../routes';
import { templateOnDeleteUpdate } from '../../services/mutationService';
import { templateRemovedNotification } from '../../services/notificationService';

type Props = {
  templateId: string;
  setDeleted: (value: boolean) => void;
};

const DeleteTemplateButton: React.FC<Props> = ({ templateId, setDeleted }: Props) => {
  const [deleteTemplate, { error }] = useDeleteTemplateMutation();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const manager = useAuthorityManager();
  const { handleGqlError } = useApolloErrorHandling(error);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const onDelete = async () => {
    setLoading(true);
    setDeleted(true);
    const { errors } = await deleteTemplate({
      variables: { id: templateId },
      update: templateOnDeleteUpdate(manager.getUserProfile()?.id),
    });

    if (errors) {
      handleGqlError(errors);
      setDeleted(false);
      return;
    }

    setLoading(false);
    templateRemovedNotification();
    await router.push(TemplatesRoute);
  };

  return (
    <Box>
      <Button isLoading={loading} onClick={() => setIsOpen(true)} maxW="11em" minW="11em" colorScheme="blue" fontSize="1.3em">
        <Icon mr="0.2em" as={FaTrash} />
        Delete Template
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Template
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can{"'"}t undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  onClose();
                  await onDelete();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeleteTemplateButton;
