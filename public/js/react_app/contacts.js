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

import { Resource } from "../react_app/resource";

function Contact(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card mx-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "id"
  }, "id"), /*#__PURE__*/React.createElement("div", {
    id: "id",
    className: "form-control"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "first_name"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    id: "first_name",
    className: "form-control",
    type: "text",
    value: props.attributes.first_name
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "last_name"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    id: "last_name",
    className: "form-control",
    type: "text",
    value: props.attributes.last_name
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "phone_number"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    id: "phone_number",
    className: "form-control",
    type: "text",
    value: props.attributes.phone_number
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "country_code"
  }, "Country Code"), /*#__PURE__*/React.createElement("input", {
    id: "country_code",
    className: "form-control",
    type: "text",
    value: props.attributes.country_code
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "timezone"
  }, "Timezone"), /*#__PURE__*/React.createElement("input", {
    id: "timezone",
    className: "form-control",
    type: "text",
    value: props.attributes.timezone
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "inserted_on"
  }, "Created"), /*#__PURE__*/React.createElement("div", {
    id: "inserted_on",
    className: "form-control"
  }, props.attributes.inserted_on)), /*#__PURE__*/React.createElement("div", {
    className: "input-group input-group-sm mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-group-text",
    htmlFor: "updated_on"
  }, "Updated"), /*#__PURE__*/React.createElement("div", {
    id: "updated_on",
    className: "form-control"
  }, props.attributes.updated_on)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary mt-1"
  }, "update"));
}

var Contacts = /*#__PURE__*/function (_React$Component) {
  _inherits(Contacts, _React$Component);

  var _super = _createSuper(Contacts);

  function Contacts(props) {
    _classCallCheck(this, Contacts);

    return _super.call(this, props);
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