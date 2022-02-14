$(() => {
  $.validator.addMethod("alphabets", function (value) {
    return /^[a-zA-Z\s]+$/.test(value);
  });

  let $registerForm = $("#registration");

  if ($registerForm.length) {
    $registerForm.validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 20,
          alphabets: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
          minlength: 10,
          maxlength: 10,
          digits: true,
        },
        country: {
          required: true,
          alphabets: true,
        },
        city: {
          required: true,
          alphabets: true,
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20,
        },
      },
      messages: {
        name: {
          required: "Full Name is required",
          minlength: "Full name must be at least 2 characters",
          maxlength: "Full name must be less than 20 characters",
          alphabets: "Full name must contain only alphabets",
        },
        email: {
          required: "Email is required",
          email: "Email must be valid",
        },
        phone: {
          required: "Contact number is required",
          minlength: "Contact number must be at least 10 digits",
          maxlength: "Contact number must be less than 10 digits",
          digits: "Contact number must contain only digits",
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 6 characters",
          maxlength: "Password must be less than 20 characters",
        },
        country: {
          required: "Country is required",
          alphabets: "Country must contain only alphabets",
        },
        city: {
          required: "City is required",
          alphabets: "City must contain only alphabets",
        },
      },
    });
  }
});

$("#submit-btn").click((e) => {
  //   e.preventDefault();
  alert("Submitted");
  console.log("Submitted: ", e);
  //   if ($("#registration").valid()) {
  //     let data = {
  //       name: $("#name").val(),
  //       email: $("#email").val(),
  //       contactNumber: $("#phone").val(),
  //       country: $("#country").val(),
  //       city: $("#city").val(),
  //       password: $("#password").val(),
  //     };
  //     alert(data);
  //     $.ajax({
  //       url: "/register",
  //       type: "POST",
  //       data: data,
  //       beforeSend: (request) => {
  //         $("#submit-btn").innerHTML = "Wait...";
  //       },
  //       success: (data) => {
  //         if (data.success) {
  //           $("#registration")[0].reset();
  //           $("#registration").validate().resetForm();
  //           $("#registration").find(".error").removeClass("error");
  //           $("#registration").find(".success").removeClass("success");
  //           $("#registration").find(".error-msg").remove();
  //           $("#registration").find(".success-msg").remove();
  //           $("#submit-btn").innerHTML = "Register";
  //           // alertify.success(data.message);
  //           window.location = "/";
  //         } else {
  //           $("#submit-btn").innerHTML = "Register";
  //           $("#registration").append(
  //             `<div class="error-msg">
  //             <p>${data.message}</p>
  //           </div>`
  //           );
  //           // alertify.error(data.message);
  //         }
  //       },
  //     });
  //   }
});
