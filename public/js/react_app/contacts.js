function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ContactEntity, Resource, SpecificationAssembler } from "../react_app/resource";

var Contact = /*#__PURE__*/function (_React$Component) {
  _inherits(Contact, _React$Component);

  var _super = _createSuper(Contact);

  function Contact(props) {
    var _this;

    _classCallCheck(this, Contact);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateContact", function () {
      var specAssembler = new SpecificationAssembler(_this.data, ContactEntity.table_name, true);

      var self = _assertThisInitialized(_this);

      var encodedData = JSON.stringify(specAssembler.spec);
      $.ajax({
        url: "/" + ContactEntity.table_name + "/" + self.props.attributes.id,
        method: "PATCH",
        data: encodedData,
        // dataType: Resource.dataType,
        success: function success(result) {
          console.log(result);
        },
        error: function error(e) {
          console.log(e);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateField", function (e) {
      _this.data[e.target.name + _this.props.attributes.id] = e.target.value;
    });

    _this.updated = 0;
    _this.data = {
      first_name: _this.props.attributes.first_name,
      last_name: _this.props.attributes.last_name,
      phone_number: _this.props.attributes.phone_number,
      country_code: _this.props.attributes.country_code,
      timezone: _this.props.attributes.timezone,
      inserted_on: _this.props.attributes.inserted_on,
      updated_on: _this.props.attributes.updated_on
    };
    return _this;
  }

  _createClass(Contact, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "card mx-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "id" + this.props.attributes.id
      }, "id"), /*#__PURE__*/React.createElement("div", {
        id: "id" + this.props.attributes.id,
        className: "form-control"
      }, this.props.attributes.id)), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "first_name" + this.props.attributes.id
      }, "First Name"), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "first_name" + this.props.attributes.id,
        id: "first_name" + this.props.attributes.id,
        className: "form-control",
        type: "text",
        defaultValue: this.props.attributes.first_name
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "last_name" + this.props.attributes.id
      }, "Last Name"), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "last_name" + this.props.attributes.id,
        id: "last_name" + this.props.attributes.id,
        className: "form-control",
        type: "text",
        defaultValue: this.props.attributes.last_name
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "phone_number" + this.props.attributes.id
      }, "First Name"), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "phone_number" + this.props.attributes.id,
        id: "phone_number" + this.props.attributes.id,
        className: "form-control",
        type: "text",
        defaultValue: this.props.attributes.phone_number
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "country_code" + this.props.attributes.id
      }, "Country Code"), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "country_code" + this.props.attributes.id,
        id: "country_code" + this.props.attributes.id,
        className: "form-control",
        type: "text",
        defaultValue: this.props.attributes.country_code
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "timezone" + this.props.attributes.id
      }, "Timezone"), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "timezone" + this.props.attributes.id,
        id: "timezone" + this.props.attributes.id,
        className: "form-control",
        type: "text",
        defaultValue: this.props.attributes.timezone
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "inserted_on" + this.props.attributes.id
      }, "Created"), /*#__PURE__*/React.createElement("div", {
        id: "inserted_on" + this.props.attributes.id,
        className: "form-control"
      }, this.props.attributes.inserted_on)), /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm mb-1"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text",
        htmlFor: "updated_on" + this.props.attributes.id
      }, "Updated"), /*#__PURE__*/React.createElement("div", {
        id: "updated_on" + this.props.attributes.id,
        className: "form-control"
      }, this.props.attributes.updated_on)), /*#__PURE__*/React.createElement("button", {
        onClick: this.updateContact,
        className: "btn btn-secondary mt-1"
      }, "update"));
    }
  }]);

  return Contact;
}(React.Component);

var Contacts = /*#__PURE__*/function (_React$Component2) {
  _inherits(Contacts, _React$Component2);

  var _super2 = _createSuper(Contacts);

  function Contacts(props) {
    _classCallCheck(this, Contacts);

    return _super2.call(this, props);
  }

  _createClass(Contacts, [{
    key: "prepareContacts",
    value: function prepareContacts() {
      var collection = this.props.contacts.data;
      var contacts = [];

      for (var i = 0; i < collection.length; i++) {
        var resource = new Resource(collection[i][Resource.data_key]);
        contacts.push( /*#__PURE__*/React.createElement(Contact, {
          attributes: resource.attributes
        }));
      }

      return contacts;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.contacts.length == 0) return /*#__PURE__*/React.createElement("div", null);
      var contacts = this.prepareContacts();
      return /*#__PURE__*/React.createElement("div", {
        className: "d-flex"
      }, contacts);
    }
  }]);

  return Contacts;
}(React.Component);

export { Contacts };