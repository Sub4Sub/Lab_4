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

    function displayContact()
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          if($("#subscribeCheckbox")[0].checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }

          location.href = '/contact';
        });
    }

    function displayContactList() 
    {
      // don't allow visitors to go here
      authGuard();

      if (localStorage.length > 0) 
      {

        let contactList = document.getElementById("contactList");

        let data = "";

        let keys = Object.keys(localStorage);
         
        let index = 1;

        for (const key of keys) 
        {
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th scope="row" class="text-center">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index++;
        }

        contactList.innerHTML = data;

        $("button.edit").on("click", function(){
          location.href = "/edit#" + $(this).val();
         });

         $("button.delete").on("click", function(){
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val());
           }
           location.href = "/contact-list"; // refresh the page
         });

         $("#addButton").on("click", function() 
         {
          location.href = "/edit";
         });
      }
    }

    function displayEdit()
    {
      let key = location.hash.substring(1);

      let contact = new core.Contact();

      // check to ensure that the key is not empty
      if(key != "")
      {
        // get contact info from localStorage
        contact.deserialize(localStorage.getItem(key));

        // display contact information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        // modify the page so that it shows "Add Contact" in the header 
        $("main>h1").text("Add Contact");
        // modify edit button so that it shows "Add" as well as the appropriate icon
        $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
      }

      // form validation
      formValidation();
      
     $("#editButton").on("click", function() 
        {
            // check to see if key is empty
          if(key == "")
          {
            // create a new key
            key = contact.FullName.substring(0, 1) + Date.now();
          }

          // copy contact info from form to contact object
          contact.FullName = $("#fullName").val();
          contact.ContactNumber = $("#contactNumber").val();
          contact.EmailAddress = $("#emailAddress").val();

          // add the contact info to localStorage
          localStorage.setItem(key, contact.serialize());

          // return to the contact list
          location.href = "/contact-list";
          
        });

      $("#cancelButton").on("click", function()
      {
        // return to the contact list
        location.href = "/contact-list";
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

    /**
     * This function is the Callback function for the TaskList
     *
     */
    function DisplayTaskList()
    {

      authGuard();

        let messageArea = $("#messageArea");
        messageArea.hide();
        let taskInput = $("#taskTextInput");

        // add a new Task to the Task List
        $("#newTaskButton").on("click", function()
        {         
            AddNewTask();
        });

        taskInput.on("keypress", function(event)
        {
          if(event.key == "Enter")
          {
            AddNewTask();
          }
         });

        // Edit an Item in the Task List
        $("ul").on("click", ".editButton", function(){
           let editText = $(this).parent().parent().children(".editTextInput");
           let text = $(this).parent().parent().text();
           editText.val(text).show().trigger("select");
           editText.on("keypress", function(event)
           {
            if(event.key == "Enter")
            {
              if(editText.val() != "" && editText.val().charAt(0) != " ")
              {
                editText.hide();
                $(this).parent().children("#taskText").text(editText.val());
                messageArea.removeAttr("class").hide();
              }
              else
              {
                editText.trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
              }
            }
           });
        });

        // Delete a Task from the Task List
        $("ul").on("click", ".deleteButton", function(){
            if(confirm("Are you sure?"))
            {
                $(this).closest("li").remove();
            }    
        });
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