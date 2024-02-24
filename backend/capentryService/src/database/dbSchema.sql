
CREATE TABLE WorkshopItems (
    ItemID INT PRIMARY KEY IDENTITY(1,1),
    WorkshopOwnerID INT FOREIGN KEY REFERENCES Users(UserID),
    ImageURL NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Material NVARCHAR(50) NOT NULL,
    DateRequired DATE NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending' NOT NULL,
    Price DECIMAL(18, 2) NOT NULL
);

CREATE TABLE CarpentersItems(
    ItemID INT PRIMARY KEY IDENTITY(1,1)
    CarpenterID INT FOREIGN KEY REFERENCES Users(UserID),
    ImageURL NVARCHAR(255) NOT NULL, 
    Description NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Material NVARCHAR(50) NOT NULL,
);

-- Create the WorkRequests table with FullName column
CREATE TABLE WorkRequests (
    RequestID INT PRIMARY KEY IDENTITY(1,1),
    CarpenterID INT,
    ItemID INT,
    RequestDate DATETIME DEFAULT GETDATE(), 
    EstimatedCompletionDate DATE,
    AdditionalNotes NVARCHAR(MAX),
    QualificationLevel NVARCHAR(50),
    CarpenterName NVARCHAR(100),  -- New column for full name
    CarpenterEmail NVARCHAR(255),
    CarpenterPhoneNumber NVARCHAR(20),
    ImageURL NVARCHAR(255),
    ItemDescription NVARCHAR(MAX),
    Category NVARCHAR(50),
    Material NVARCHAR(50),
    ItemPrice DECIMAL(18, 2),
    RequiredDate DATE,
    Status NVARCHAR(50) DEFAULT 'PendingApproval', -- New column for status
    CONSTRAINT FK_Carpenter_WorkRequests FOREIGN KEY (CarpenterID) REFERENCES Users(UserID),
    CONSTRAINT FK_Item_WorkRequests FOREIGN KEY (ItemID) REFERENCES WorkshopItems(ItemID)
);

-- Create a trigger to automatically update CarpenterName
CREATE TRIGGER UpdateCarpenterName
ON WorkRequests
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE wr
    SET wr.CarpenterName = CONCAT(u.FirstName, ' ', u.LastName)
    FROM WorkRequests wr
    INNER JOIN Users u ON wr.CarpenterID = u.UserID
    INNER JOIN inserted i ON wr.RequestID = i.RequestID;
END;


-- Update the WorkRequests table with FullName column
UPDATE WorkRequests
SET 
    QualificationLevel = Users.QualificationLevel,
    CarpenterEmail = Users.Email,
    CarpenterPhoneNumber = Users.PhoneNumber
FROM WorkRequests
JOIN Users ON WorkRequests.CarpenterID = Users.UserID;

UPDATE WorkRequests
SET 
    ImageURL = WorkshopItems.ImageURL,
    ItemDescription = WorkshopItems.Description,
    Category = WorkshopItems.Category,
    Material = WorkshopItems.Material,
    RequestDate = WorkshopItems.DateRequired,
    ItemPrice = WorkshopItems.Price
FROM WorkRequests
JOIN WorkshopItems ON WorkRequests.ItemID = WorkshopItems.ItemID;


