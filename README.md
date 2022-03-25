# crud_DepartmentEmploy_ReactNetCore
CRUD  Deparment and Employees. Developed in React and .net core 



**TECHNICAL SPECIFICATIONS FOR DEVELOPMENT**

1. **Data Base**   
   1. Microsoft SQL Server 2014 - 12.0.2269.0 (X64) 	Jun 10 2015 03:35:45 	Copyright (c) Microsoft Corporation	Developer Edition (64-bit) on Windows NT 6.3 <X64> (Build 19044: )
 

1. **Rest API** 
   1. Visual Studio Community 2019
   1. Framework: .NET 5.0
   1. EntityFrameworkCore.SqlServer 5.0.15

1. **User interface application (ClientReact)**  
   1. react: ^17.0.2,   
   1. react-dom: 17.0.2,
   1. react-router-dom: 6.2.2,   
   1. react-scripts: 5.0.0,
   1. bootstrap: 5.1.3,  
   1. axios: 0.26.1,
  
**STEPS TO START THE PROJECT**

1. **Data Base**
   1. Run the following Scripts
      1. Script to create Database, Tables, located in the directory (..\Script) 
   
1. **Rest API** 
   1. Insert database connection credentials (“**Server, User, Password”**) in the API, located in the file “**appsettings.json”** in the object “**ConnectionStrings”** . 
   1. Run Rest API service located in the folder: **…\WebApi_CRUD**
   1. To run the .net core 5 api you must have the asp.net core hosting bundle runtime. Below the download link.
   https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-6.0.3-windows-hosting-bundle-installer
  

1. **Raise React UI (Client)**
   1. **Install:** Node.js if you don't have it installed**.**
   1. **Open the following folder in Visual Code :** ClientReact
   1. **Open command line in Visual Code: window (Ctrl + `) or Mac shortcut (Command + Shift + P)**
   1. **Run the following code to download packages from node\_modules :** npm install
   1. **Once downloaded, run the following code to Run Client Reat.js:** npm start


