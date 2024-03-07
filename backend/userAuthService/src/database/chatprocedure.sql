CREATE OR ALTER PROCEDURE CreateChatRoom
    @Participant1ID INT,
    @Participant2ID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewChatRoomID INT;

    SELECT @NewChatRoomID = ChatRoomID
    FROM ChatRooms
    WHERE
        (Participant1ID = @Participant1ID AND Participant2ID = @Participant2ID)
        OR
        (Participant1ID = @Participant2ID AND Participant2ID = @Participant1ID);

    IF @NewChatRoomID IS NULL
    BEGIN
        INSERT INTO ChatRooms (Participant1ID, Participant2ID)
        VALUES (@Participant1ID, @Participant2ID);

        SET @NewChatRoomID = SCOPE_IDENTITY();
    END

    SELECT @NewChatRoomID AS ChatRoomID;
END;
