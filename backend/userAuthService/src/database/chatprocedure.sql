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

--\procedure to send message
CREATE OR ALTER PROCEDURE SendMessage
    @ChatRoomID INT,
    @SenderID INT,
    @Content NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Messages (ChatRoomID, SenderID, Content, Timestamp)
    VALUES (@ChatRoomID, @SenderID, @Content, GETDATE());
END;

EXEC SendMessage @ChatRoomID = 1, @SenderID = 1039, @Content = 'Hello, how are you?';