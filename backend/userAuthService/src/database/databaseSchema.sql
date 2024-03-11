
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

--Table for ChatRooms
     CREATE TABLE ChatRooms (
    ChatRoomID INT PRIMARY KEY IDENTITY(1,1),
    Participant1ID INT FOREIGN KEY REFERENCES Users(UserID),
    Participant2ID INT FOREIGN KEY REFERENCES Users(UserID),
    CONSTRAINT UC_Participants UNIQUE (Participant1ID, Participant2ID)
);
--Table for Messages
CREATE TABLE Messages (
    MessageID INT PRIMARY KEY IDENTITY(1,1),
    ChatRoomID INT FOREIGN KEY REFERENCES ChatRooms(ChatRoomID),
    SenderID INT FOREIGN KEY REFERENCES Users(UserID),
    Content NVARCHAR(MAX),
    Timestamp DATETIME
);

ALTER TABLE Messages
ADD ReceiverID INT FOREIGN KEY REFERENCES Users(UserID);