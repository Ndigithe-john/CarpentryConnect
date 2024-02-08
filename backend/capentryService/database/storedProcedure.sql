--Procedur to create items to that needs to be built
CREATE PROCEDURE AddWorkshopItems
    @ImageURL NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @Category NVARCHAR(50),
    @Material NVARCHAR(50),
    @DateRequired DATE,
    @UserID INT 
AS
BEGIN
    SET NOCOUNT ON;

   
    INSERT INTO WorkshopItems (
        ImageURL,
        Description,
        Category,
        Material,
        DateRequired,
        WorkshopOwnerID
    )
    VALUES (
        @ImageURL,
        @Description,
        @Category,
        @Material,
        @DateRequired,
        @UserID 
    );


EXEC AddWorkshopItems
    @ImageURL = '/images/item1.jpg',
    @Description = 'A description of the item',
    @Category = 'Tools',
    @Material = 'Metal',
    @DateRequired = '2024-02-15',
    @UserID = 1; 
	Select * from WorkshopItems

--Procedure to get all items that are not yet built
    CREATE PROCEDURE GetPendingItems
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
        Status,
        WorkshopOwnerID
    FROM
        WorkshopItems
    WHERE
        Status = 'Pending';

END;

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
        Status
    FROM
        WorkshopItems
    WHERE
        WorkshopOwnerID = @UserID;

END;
EXEC GetItemsByUserID @UserID = 1;