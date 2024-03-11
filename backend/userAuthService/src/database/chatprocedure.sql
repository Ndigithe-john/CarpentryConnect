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

    DECLARE @ReceiverID INT;

    SELECT @ReceiverID = CASE
                            WHEN Participant1ID = @SenderID THEN Participant2ID
                            WHEN Participant2ID = @SenderID THEN Participant1ID
                            ELSE NULL
                        END
    FROM ChatRooms
    WHERE ChatRoomID = @ChatRoomID;

    IF @ReceiverID IS NOT NULL
    BEGIN
        INSERT INTO Messages (ChatRoomID, SenderID, ReceiverID, Content, Timestamp)
        VALUES (@ChatRoomID, @SenderID, @ReceiverID, @Content, GETDATE());
    END;
    ELSE
    BEGIN
       
        PRINT 'ReceiverID not found for the given ChatRoomID and SenderID';
    END;
END;

EXEC SendMessage @ChatRoomID = 1, @SenderID = 1039, @Content = 'Hello, how are you?';
--Procedure to get messages for a chat rooom
CREATE OR ALTER PROCEDURE GetMessagesForChatRoom
    @ChatRoomID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        MessageID,
        SenderID,
        Content,
        Timestamp
    FROM
        Messages
    WHERE
        ChatRoomID = @ChatRoomID
    ORDER BY
        Timestamp;
END;

--Porcedure to get chatroom messages depending on participants

CREATE OR ALTER PROCEDURE GetMessagesForParticipants
    @Participant1ID INT,
    @Participant2ID INT
AS
BEGIN
    SET NOCOUNT ON;

    
    DECLARE @ChatRoomID INT;

    
    SELECT @ChatRoomID = ChatRoomID
    FROM ChatRooms
    WHERE
        (Participant1ID = @Participant1ID AND Participant2ID = @Participant2ID)
        OR
        (Participant1ID = @Participant2ID AND Participant2ID = @Participant1ID);


    IF @ChatRoomID IS NOT NULL
    BEGIN
        
        SELECT
            MessageID,
            SenderID,
            Content,
            Timestamp
        FROM
            Messages
        WHERE
            ChatRoomID = @ChatRoomID
        ORDER BY
            Timestamp;
    END;
    ELSE
    BEGIN
        
        SELECT NULL AS MessageID, NULL AS SenderID, NULL AS Content, NULL AS Timestamp WHERE 1 = 0;
    END;
END;

