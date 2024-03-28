import fs from "fs"
import { join } from "path"
import pug from "pug"
import handlebars from "handlebars";
const __dirname = new URL(".", import.meta.url).pathname
const templatesDir = "./element-templates";

import myMjsHeader from "./element-templates/my-mjs-header.mjs";

const myPugHeader = templateWrapper( pug.compile( readTemplate("my-pug-header.pug")));
const myHandlebarsHeader = templateWrapper( handlebars.compile( readTemplate("my-handlebars-header.hbs")));
const myMustacheHeader = templateWrapper( handlebars.compile( readTemplate("my-mustache-header.mustache")));
const myHtmlHeader = htmlWrapperWithState( readTemplate("my-html-header.html"));

let elements = {
  "my-mjs-header": myMjsHeader,
  "my-pug-header": myPugHeader,
  "my-handlebars-header": myHandlebarsHeader,
  "my-mustache-header": myMustacheHeader,
  "my-html-header": myHtmlHeader,
};

export default elements;

function htmlWrapper(htmlString) {
  return function ({ html }) {
    return html`${htmlString}`;
  };
}
function htmlWrapperWithState(htmlString) {
  return (new Function( `return function ({ html, state }) { return html\`${htmlString}\`; }`))();
}
function templateWrapper(templateFunction) {
  return function ({ html, state }) {
    return html`${templateFunction(state)}`;
  };
}
function readTemplate(fileName) {
  const filePath = join(__dirname,templatesDir, fileName);
  return fs.readFileSync(filePath, "utf8");
}
