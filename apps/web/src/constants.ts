const pathRegex = /^[/a-zA-Z0-9-#?&=_.]+$/;
const objIdRegex = /^[a-f\d]{24}$/i;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export { pathRegex, objIdRegex, emailRegex };
