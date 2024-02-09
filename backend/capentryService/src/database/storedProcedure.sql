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
     WorkshopOwnerID
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
