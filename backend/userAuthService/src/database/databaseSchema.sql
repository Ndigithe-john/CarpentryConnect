
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(20), 
    Role NVARCHAR(50) NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Waiting' NOT NULL,
    QualificationLevel NVARCHAR(50), 
    DocumentPath NVARCHAR(255), 
    WorkshopName NVARCHAR(255), 
    WorkshopLocation NVARCHAR(255), 
	PasswordHash NVARCHAR(255) NOT NULL 
);
ALTER TABLE Users
ADD About NVARCHAR(MAX),
    ProfilePhoto NVARCHAR(255);

 ALTER Table Users 
 ADD Latitude FLOAT,
     Longitude FLOAT;