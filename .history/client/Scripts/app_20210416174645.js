/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) =>
{


    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber()
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress()
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

   

    /**
     * Processes the Login and performs validation
     */
    function performLogin()
    {
      let messageArea = $("#messageArea");
      messageArea.hide();

      let username = $("#username");
      let password = $("#password");
      let success = false;
      let newUser = new core.User();

      // use ajax to access the json file
      $.get("./Data/users.json", function(data)
      {
        // check each user in the users.json file  (linear search)
        for (const user of data.users) 
        {
          if(username.val() == user.Username && password.val() == user.Password)
          {
            newUser.fromJSON(user);
            success = true;
            break;
          }
        }

        // if username and password matches - success... then perform login
        if(success)
        {
          // add user to session storage
          sessionStorage.setItem("user", newUser.serialize());

          // hide any error message
          messageArea.removeAttr("class").hide();

          // redirect user to secure area - contact-list.html
          location.href = "/contact-list";
        }
        else
        {
          // display an error message
          username.trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
        }
      });
    }


    function authGuard()
    {
      if(!sessionStorage.getItem("user"))
      {
      // redirect back to login page
      location.href = "/login";
      }
    }

    /**
     * This function adds a new Task to the TaskList
     */
    function AddNewTask() 
    {
      let messageArea = $("#messageArea");
      messageArea.hide();
      let taskInput = $("#taskTextInput");

      if (taskInput.val() != "" && taskInput.val().charAt(0) != " ") 
      {
        let newElement = `
              <li class="list-group-item" id="task">
              <span id="taskText">${taskInput.val()}</span>
              <span class="float-end">
                  <button class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
                  <button class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button>
              </span>
              <input type="text" class="form-control edit-task editTextInput">
              </li>
              `;
        $("#taskList").append(newElement);
        messageArea.removeAttr("class").hide();
        taskInput.val("");
      } 
      else 
      {
        taskInput.trigger("focus").trigger("select");
        messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
      }
    }


    function Start()
    {
        console.log("App Started...");

        loadHeader(router.ActiveLink);
      
        loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));

        loadFooter();
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core={}));