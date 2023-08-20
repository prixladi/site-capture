import { TypePolicies } from '@apollo/client';
import { Site, Viewport } from '../graphql';

const typePolicies: TypePolicies = {
  Site: {
    fields: {
      viewPorts: {
        merge: (_: Viewport, incomming: Viewport): Viewport => {
          return incomming;
        },
      },
    },
  },
  Template: {
    fields: {
      viewPorts: {
        merge: (_: Viewport, incomming: Viewport): Viewport => {
          return incomming;
        },
      },
    },
  },
  Mutation: {
    fields: {
      site: {
        merge: (existing: Site, incomming: Site): Site => {
          return {
            ...existing,
            ...incomming,
          };
        },
      },
      template: {
        merge: (existing: Site, incomming: Site): Site => {
          return {
            ...existing,
            ...incomming,
          };
        },
      },
    },
  },
};

export default typePolicies;
