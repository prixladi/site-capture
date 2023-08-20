const HomeRoute = '/';
const AuthRoute = '/auth';
const SitesRoute = '/sites';
const NewSiteRoute = '/sites/new';
const SiteRoute = (id: string): string => `/sites/${id}`;
const TemplatesRoute = '/templates';
const NewTemplateRoute = '/templates/new';
const TemplateRoute = (id: string): string => `/templates/${id}`;
const LogoutRoute = '/logout';

const GithubRoute = 'https://github.com/prixladi/site-capture-next';

export { HomeRoute, AuthRoute, SitesRoute, NewSiteRoute, SiteRoute, TemplatesRoute, NewTemplateRoute, TemplateRoute, LogoutRoute };
export { GithubRoute };
