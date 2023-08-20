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
import { useDeleteSiteMutation } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import { SitesRoute } from '../../routes';
import { siteOnDeleteUpdate } from '../../services/mutationService';
import { siteDeletedNotification } from '../../services/notificationService';

type Props = {
  siteId: string;
  setDeleted: (value: boolean) => void;
};

const DeleteSiteButton: React.FC<Props> = ({ siteId, setDeleted }: Props) => {
  const [deleteSite, { error }] = useDeleteSiteMutation();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { handleGqlError } = useApolloErrorHandling(error);
  const router = useRouter();
  const manager = useAuthorityManager();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const onDelete = async () => {
    setLoading(true);
    setDeleted(true);
    const { errors } = await deleteSite({
      variables: { id: siteId },
      update: siteOnDeleteUpdate(manager.getUserProfile()?.id),
    });

    if (errors) {
      handleGqlError(errors);
      setDeleted(false);
      return;
    }

    setLoading(false);
    siteDeletedNotification();
    await router.push(SitesRoute);
  };

  return (
    <Box>
      <Button isLoading={loading} onClick={() => setIsOpen(true)} maxW="11em" minW="11em" colorScheme="blue" fontSize="1.3em">
        <Icon mr="0.2em" as={FaTrash} /> Delete Site
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
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

export default DeleteSiteButton;
