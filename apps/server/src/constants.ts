const pathRegex = /^[/a-zA-Z0-9-#?&=_.]+$/;
const objIdRegex = /^[a-f\d]{24}$/i;

const JOB_UPDATED = (id: string): string => `job_updated.${id}`;

export { pathRegex, objIdRegex, JOB_UPDATED };
