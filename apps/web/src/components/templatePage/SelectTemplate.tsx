import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FaMap } from 'react-icons/fa';
import { TemplateFieldsFragment, useMeQuery } from '../../graphql';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';

type Props = {
  fillFromTemplate: (template: TemplateFieldsFragment) => void;
};

const SelectTemplate: React.FC<Props> = ({ fillFromTemplate }: Props) => {
  const { data, error } = useMeQuery();
  useApolloErrorHandling(error);

  if (!data) {
    return null;
  }

  return (
    <Menu>
      <MenuButton as={Button} maxW="11em" minW="11em" colorScheme="blue" fontSize="1.3em">
        <Icon mr="0.2em" as={FaMap} />
        Fill from template
      </MenuButton>
      <MenuList>
        {data.me.templates.map((template) => (
          <MenuItem key={template.id} onClick={() => fillFromTemplate(template)}>
            {template.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SelectTemplate;
