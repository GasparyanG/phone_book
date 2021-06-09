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

import { ContactEntity, SpecificationAssembler } from "../react_app/resource";

var Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "addContact", function () {
      var specAssembler = new SpecificationAssembler(_this.data, ContactEntity.table_name, true);
      var encodedData = JSON.stringify(specAssembler.spec);
      $.ajax({
        url: "/" + ContactEntity.table_name,
        method: "POST",
        data: encodedData,
        // dataType: Resource.dataType,
        success: function success(result) {
          console.log(result);
        },
        error: function error(e) {}
      }); // Ajax call should be triggered here
    });

    _defineProperty(_assertThisInitialized(_this), "updateField", function (e) {
      _this.data[e.target.name] = e.target.value;
    });

    _this.data = {
      first_name: "",
      last_name: "",
      phone_number: "",
      country_code: "",
      timezone: "",
      inserted_on: "",
      updated_on: ""
    };
    return _this;
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      if (this.props.new_is_pressed) return /*#__PURE__*/React.createElement("div", {
        className: "navigation__form"
      }, /*#__PURE__*/React.createElement("div", {
        className: "navigation__form__input"
      }, /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "first_name",
        type: "text"
      }), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "last_name",
        type: "text"
      })), /*#__PURE__*/React.createElement("div", {
        className: "navigation__form__input"
      }, /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "phone_number",
        type: "text"
      })), /*#__PURE__*/React.createElement("div", {
        className: "navigation__form__input"
      }, /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "country_code",
        type: "text"
      }), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "timezone",
        type: "text"
      })), /*#__PURE__*/React.createElement("div", {
        className: "navigation__form__input"
      }, /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "inserted_on",
        type: "text"
      }), /*#__PURE__*/React.createElement("input", {
        onChange: this.updateField,
        name: "updated_on",
        type: "text"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.addContact,
        type: "button"
      }, "Add"));
      return /*#__PURE__*/React.createElement("div", null);
    }
  }]);

  return Form;
}(React.Component);

export { Form };