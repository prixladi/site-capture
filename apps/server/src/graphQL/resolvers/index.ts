import { mergeResolvers } from 'graphql-tools';

import meResolver from './me';
import templateResolver from './template';
import siteResolver from './site';
import jobResolver from './job';

const resolvers = mergeResolvers([meResolver, templateResolver, siteResolver, jobResolver]);

export default resolvers;
