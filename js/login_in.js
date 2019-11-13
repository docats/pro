// 切換電郵或手機登入

var FormAction = $('#form_action');
var FormValid = null;

$(function () {
    if ($("#MobileNumber").val() != "")
        ChangeEntryMode();
    else
        DefineVaild();
});

var ChangeEntryMode = function () {
    var mode = $("#divEmail").css("display") == "none" ? "Mobile" : "Email";
    if (mode == "Mobile") {
        $("#modeSwitch").html($("#TLoginMobile").val());
        $("#divEmail").css("display", "");
        $("#divMobile").css("display", "none");
        $("#EMail").val("");
        $("#loginAC").css("display", "");
    }
    else {
        $("#modeSwitch").html($("#TLoginEmail").val());
        $("#divEmail").css("display", "none");
        $("#divMobile").css("display", "");
        $("#MobileNumber").val("");
        $("#loginAC").css("display", "none");
    }
    if (FormValid != null) FormValid.resetForm();
    DefineVaild();
}

var DefineVaild = function () {
    var mode = $("#divEmail").css("display") == "none" ? "Mobile" : "Email";
    var ruleMail = {
        "EMail": { required: true, email: true, maxlength: 50 },
        "PinNumber": { required: true },
    };

    var ruleMobile = {
        "PrefixCode": { required: true },
        "MobileNumber": { required: true, maxlength: 10, minlength: 10 },
        "PinNumber": { required: true },
    };

    if (FormValid != null) {
        if (mode == "Email") {
            removeRules(ruleMobile);
            addRules(ruleMail);
        }
        else {
            removeRules(ruleMail);
            addRules(ruleMobile);
        }
    }

    var msgObj = {
        "EMail": { required: $("#EmailRequired").val(), email: $("#InvalidEmailFormat").val(), maxlength: $("#EmailLength").val() },
        "MobileNumber": { required: $("#MobileRequired").val(), maxlength: $("#MobileLength").val(), minlength: $("#MobileLength").val() },
        "PrefixCode": { required: $("#SelectRequired").val() },
        "PinNumber": { required: $("#PinNumberRequired").val() }
    };

    VaildSet((mode == "Email") ? ruleMail : ruleMobile, msgObj);
}
