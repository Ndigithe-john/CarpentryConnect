-- Procedure to Add Workshop Item
CREATE PROCEDURE AddWorkshopItem
    @WorkshopOwnerID INT,
    @ImageURL NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @Category NVARCHAR(50),
    @Material NVARCHAR(50),
    @DateRequired DATE,
    @Price DECIMAL(18, 2)
AS
BEGIN
    SET NOCOUNT ON;

  
    INSERT INTO WorkshopItems (
        WorkshopOwnerID,
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        Status,
        Price
    )
    VALUES (
        @WorkshopOwnerID,
        @ImageURL,
        @Description,
        @Category,
        @Material,
        @DateRequired,
        'Pending',
        @Price
    );

END;

EXEC AddWorkshopItem
    @WorkshopOwnerID = 1,
    @ImageURL = '/images/item1.jpg',
    @Description = 'A description of the item',
    @Category = 'Tools',
    @Material = 'Metal',
    @DateRequired = '2024-02-15',
    @Price = 29.99; 

	Select * from WorkshopItems

--Procedure to get all items that are pending
   CREATE OR ALTER PROCEDURE GetPendingItems
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ItemID,
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        Price,
        Status
       FROM
        WorkshopItems
    WHERE
        Status = 'Pending';

END;
EXEC GetPendingItems
--Procedure to get all items from a particular workshop
CREATE PROCEDURE GetItemsByUserID
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

  
    SELECT
        ItemID,
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        price,
        Status
    FROM
        WorkshopItems
    WHERE
        WorkshopOwnerID = @UserID;

END;
EXEC GetItemsByUserID @UserID = 1;

-- Procedure to Update Workshop Item Status
CREATE PROCEDURE UpdateWorkshopItemStatus
    @ItemID INT,
    @NewStatus NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE WorkshopItems
    SET Status = @NewStatus
    WHERE ItemID = @ItemID;

END;
EXEC UpdateWorkshopItemStatus
    @ItemID = 1,
    @NewStatus = 'Approved';

 CREATE PROCEDURE DeleteWorkshopItem
    @ItemID INT
AS
BEGIN
    SET NOCOUNT ON;

  
    DELETE FROM WorkshopItems
    WHERE ItemID = @ItemID;

  
END;
EXEC DeleteWorkshopItem
    @ItemID = 1; 

    -- Procedure to Get All Workshop Items
CREATE PROCEDURE GetAllWorkshopItems
AS
BEGIN
    SET NOCOUNT ON;

 
    SELECT
        ItemID,
        WorkshopOwnerID,
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        Status,
        Price
    FROM
        WorkshopItems;


END;
EXEC GetAllWorkshopItems;


-- Carpenter Create Items

CREATE PROCEDURE CarpenterItemAdd
    @CarpenterID INT,
    @ImageURL NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @Category NVARCHAR(50),
    @Material NVARCHAR(50),
  
AS
BEGIN
    SET NOCOUNT ON;

  
    INSERT INTO CarpentersItems (
        CarpenterID,
        ImageURL,
        Description,
        Category,
        Material,
    )
    VALUES (
        @CarpenterID,
        @ImageURL,
        @Description,
        @Category,
        @Material,
    );

END;




-- New test
CREATE PROCEDURE CarpenterItemAdd
    @CarpenterID INT,
    @ImageURL NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @Category NVARCHAR(50),
    @Material NVARCHAR(50)
  
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO CarpentersItems (
        CarpenterID,
        ImageURL,
        Description,
        Category,
        Material
    )
    VALUES (
        @CarpenterID,
        @ImageURL,
        @Description,
        @Category,
        @Material
    );

END;
DROP TABLE CarpentersItems
CREATE TABLE CarpentersItems(
    ItemID INT PRIMARY KEY IDENTITY(1,1),
    CarpenterID INT FOREIGN KEY REFERENCES Users(UserID),
    ImageURL NVARCHAR(255) NOT NULL, 
    Description NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Material NVARCHAR(50) NOT NULL,
);

EXEC CarpenterItemAdd
    @CarpenterID = 1034,
    @ImageURL = '/images/item1.jpg',
    @Description = 'A description of the item',
    @Category = 'Tools',
    @Material = 'Metal'

	Select * from CarpentersItems
	Select * from Users



    
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


CREATE OR ALTER PROCEDURE GetItemsByUserID
    @UserID INT,
    @UserType NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF @UserType = 'WorkshopOwner' 
    BEGIN
        SELECT
            ItemID,
            ImageURL,
            Description,
            Category,
            Material,
            DateRequired,
            price,
            Status
        FROM
            WorkshopItems
        WHERE
            WorkshopOwnerID = @UserID;
    END
    ELSE IF @UserType = 'Carpenter' 
    BEGIN
        SELECT
            ItemID,
            ImageURL,
            Description,
            Category,
            Material
        FROM
            CarpentersItems
        WHERE
            CarpenterID = @UserID;
    END
    
END;

-- Example: Get WorkshopItems for a user
EXEC GetItemsByUserID @UserID = 1033, @UserType = 'WorkshopOwner';

-- Example: Get CarpentersItems for a user
EXEC GetItemsByUserID @UserID = 456, @ItemType = 'Carpenter';

-- Procedure to get Carpenter Item Details by Id

CREATE PROCEDURE GetCarpenterItemDetails
    @ItemID INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM CarpentersItems WHERE ItemID = @ItemID)
    BEGIN
        SELECT * FROM CarpentersItems WHERE ItemID = @ItemID;
    END
    ELSE
    BEGIN
        PRINT 'ItemID not found in CarpentersItems.';
    END
END;
--Procedure to Get Workshop Items by ID
CREATE PROCEDURE GetWorkshopItemDetails
    @ItemID INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM WorkshopItems WHERE ItemID = @ItemID)
    BEGIN
        SELECT * FROM WorkshopItems WHERE ItemID = @ItemID;
    END
    ELSE
    BEGIN
        PRINT 'ItemID not found in WorkshopItems.';
    END
END;

EXEC GetCarpenterItemDetails @ItemID = 7;

EXEC GetWorkshopItemDetails @ItemID = 7;



CREATE PROCEDURE RequestJob
    @CarpenterID INT,
    @ItemID INT,
    @EstimatedCompletionDate DATE,
    @AdditionalNotes NVARCHAR(MAX)
AS
BEGIN
    -- Check if CarpenterID and ItemID are valid
    IF NOT EXISTS (SELECT 1 FROM Users WHERE UserID = @CarpenterID)
    BEGIN
        PRINT 'Invalid CarpenterID';
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM WorkshopItems WHERE ItemID = @ItemID)
    BEGIN
        PRINT 'Invalid ItemID';
        RETURN;
    END

    -- Insert the request into WorkRequests table
    INSERT INTO WorkRequests (
        CarpenterID,
        ItemID,
        EstimatedCompletionDate,
        AdditionalNotes,
        QualificationLevel,
        CarpenterEmail,
        CarpenterPhoneNumber,
        ImageURL,
        ItemDescription,
        Category,
        Material,
        ItemPrice,
        RequiredDate
    )
    SELECT
        @CarpenterID,
        @ItemID,
        @EstimatedCompletionDate,
        @AdditionalNotes,
        Users.QualificationLevel,
        Users.Email,
        Users.PhoneNumber,
        WorkshopItems.ImageURL,
        WorkshopItems.Description,
        WorkshopItems.Category,
        WorkshopItems.Material,
        WorkshopItems.Price,
        WorkshopItems.DateRequired
    FROM Users
    JOIN WorkshopItems ON @ItemID = WorkshopItems.ItemID
    WHERE Users.UserID = @CarpenterID;
END;

EXEC RequestJob
    @CarpenterID = 1034,
    @ItemID = 7,      
    @EstimatedCompletionDate = '2024-03-10',  
    @AdditionalNotes = 'Please complete the job as soon as possible.'; 


--Procedure to approve work request
CREATE PROCEDURE ApproveWorkRequest
    @RequestID INT
AS
BEGIN
   
    DECLARE @CarpenterID INT, @ItemID INT;

    
    SELECT @CarpenterID = CarpenterID, @ItemID = ItemID
    FROM WorkRequests
    WHERE RequestID = @RequestID;

   
    UPDATE WorkRequests
    SET Status = 'Approved'
    WHERE RequestID = @RequestID;
END;

EXEC ApproveWorkRequest @RequestID = 2;

---Procedure to get all carpenter Items

CREATE PROCEDURE GetAllCarpenterItems
AS
BEGIN
    SELECT 
        ItemID,
        CarpenterID,
        ImageURL,
        Description,
        Category,
        Material
    FROM CarpentersItems;
END;


-- Execute the stored procedure to get all items
EXEC GetAllCarpenterItems;


CREATE OR ALTER PROCEDURE GetPendingItems
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ItemID,
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        Price,
        Status
       FROM
        WorkshopItems
    WHERE
        Status = 'Pending';

END;


---Procedure to get the pending from a user
CREATE PROCEDURE GetPendingWorkRequestsForWorkshopOwner
    @WorkshopOwnerID INT
AS
BEGIN
    SELECT
        wr.RequestID,
        wr.CarpenterID,
        wr.ItemID,
        wr.RequestDate,
        wr.EstimatedCompletionDate,
        wr.AdditionalNotes,
        wr.QualificationLevel,
        wr.CarpenterEmail,
        wr.CarpenterPhoneNumber,
        wr.ImageURL,
        wr.ItemDescription,
        wr.Category,
        wr.Material,
        wr.ItemPrice,
        wr.RequiredDate
    FROM
        WorkRequests wr
    JOIN
        WorkshopItems wi ON wr.ItemID = wi.ItemID
    WHERE
        wr.Status = 'PendingApproval'
        AND wi.WorkshopOwnerID = @WorkshopOwnerID;
END;
EXEC GetPendingWorkRequestsForWorkshopOwner @WorkshopOwnerID=1033;