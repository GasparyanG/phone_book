class ContactEntity {
    static table_name = "contacts";
    static id = "id";
    static first_name = "first_name";
    static last_name = "last_name";
    static phone_number = "phone_number";
    static country_code = "country_code";
    static timezone = "timezone";
    static inserted_on = "inserted_on";
    static updated_on = "updated_on";
}

class SpecificationAssembler {
    constructor(
        attributes,             // payload
        type,                   // simply speaking this is a table name
        is_new = false  // resource doesn't exists yet
    ) {
        this._spec = {
            data: {}
        }

        this._spec.data[Resource.attributes_key] = attributes;
        this._spec.data[Resource.type_key] = type;
        if (!is_new)
            this._spec.data[Resource.id_key] = attributes[ContactEntity.id];
    }

    get spec() { return this._spec }
}

class Resource {
    static dataType = "application/json";

    // keys to access api result
    static data_key = "data";
    static id_key = "id";
    static type_key = "type";
    static attributes_key = "attributes";

    constructor(data) {
        this._attributes = data[Resource.attributes_key];
    }

    get attributes() { return this._attributes; }
}


// Mostly meant for pagination
class Link {
    // Keys to access values of api result
    static links_key = "links";
    static first_key = "first";
    static prev_key = "prev";
    static self_key = "self";
    static next_key = "next";
    static last_key = "last";
}

export {ContactEntity, SpecificationAssembler, Resource, Link};