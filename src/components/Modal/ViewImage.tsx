/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Image w="100%" src={imgUrl} />
        </ModalBody>

        <ModalFooter bg="pGray.700" borderBottomRadius="5px" border="none">
          <Flex w="100%">
            <Link href={imgUrl} target="_BLANK">
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
