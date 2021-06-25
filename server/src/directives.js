const {SchemaDirectiveVisitor} = require("apollo-server");
const { defaultFieldResolver } = require('graphql');

class AnonyDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field){
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async function(...args){
        const res = await resolve.apply(this,args);
        return "hidden"
        }
    }
}

class ZipDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field){
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async function(...args){
        const res = await resolve.apply(this,args);
        return null
        }
    }
}

module.exports = {
    AnonyDirective: AnonyDirective,
    ZipDirective: ZipDirective
}
  