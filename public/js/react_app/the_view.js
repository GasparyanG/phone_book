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

import { Form } from "./contact_form";
import { Contacts } from "./contacts";
import { Search } from "./search";
import { ContactEntity } from "../react_app/resource";

var TheView = /*#__PURE__*/function (_React$Component) {
  _inherits(TheView, _React$Component);

  var _super = _createSuper(TheView);

  function TheView(props) {
    var _this;

    _classCallCheck(this, TheView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateContacts", function (cont) {
      _this.setState({
        new_is_pressed: _this.state.new_is_pressed,
        contacts: cont
      });
    });

    _defineProperty(_assertThisInitialized(_this), "populateContacts", function () {
      var self = _assertThisInitialized(_this);

      $.ajax({
        url: "/" + ContactEntity.table_name,
        method: "GET",
        success: function success(result) {
          self.updateContacts(JSON.parse(result));
        },
        error: function error(e) {
          console.log(e);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openContactForm", function () {
      _this.setState({
        new_is_pressed: !_this.state.new_is_pressed,
        contacts: _this.state.contacts
      });
    });

    _defineProperty(_assertThisInitialized(_this), "search", function (e) {
      if (e.keyCode != 13) return;

      var self = _assertThisInitialized(_this);

      $.ajax({
        url: "/" + ContactEntity.table_name + "?search=" + e.target.value,
        method: "GET",
        success: function success(result) {
          self.updateContacts(JSON.parse(result));
        },
        error: function error(e) {
          console.log(e);
        }
      });
    });

    _this.populateContacts();

    _this.state = {
      new_is_pressed: false,
      contacts: []
    }; // Bindings

    _this.populate = _this.populateContacts.bind(_assertThisInitialized(_this));
    _this.searchContact = _this.search.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TheView, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "navigation"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "input-group input-group-sm my-3 col-md-8 offset-md-4"
      }, /*#__PURE__*/React.createElement("label", {
        className: "input-group-text"
      }, "Hit Enter"), /*#__PURE__*/React.createElement(Search, {
        searchContact: this.searchContact,
        className: "form-control"
      }), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-secondary",
        onClick: this.openContactForm,
        type: "navigation__button"
      }, "New Contact"))), /*#__PURE__*/React.createElement(Form, {
        populate: this.populate,
        new_is_pressed: this.state.new_is_pressed
      }), /*#__PURE__*/React.createElement(Contacts, {
        contacts: this.state.contacts
      })));
    }
  }]);

  return TheView;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(TheView, null), document.getElementById("payload"));