
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


-- One Stored procedure to delete items from both tables 

CREATE PROCEDURE DeleteItem
    @ItemID INT,
    @ItemType NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF @ItemType = 'Carpenter'
    BEGIN
      
        DELETE FROM CarpentersItems
        WHERE ItemID = @ItemID;
    END
    ELSE IF @ItemType = 'Workshop'
    BEGIN
    
        DELETE FROM WorkshopItems
        WHERE ItemID = @ItemID;
    END
   
END;


-- Example: Delete from CarpentersItems
EXEC DeleteItem @ItemID = 4, @ItemType = 'Carpenter';

-- Example: Delete from WorkshopItems
EXEC DeleteItem @ItemID = 456, @ItemType = 'Workshop';