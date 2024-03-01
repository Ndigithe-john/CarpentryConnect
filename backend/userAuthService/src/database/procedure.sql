
CREATE OR ALTER PROCEDURE CreateUser
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(255),
    @PhoneNumber NVARCHAR(20),
    @Role NVARCHAR(50),
    @QualificationLevel NVARCHAR(50) = NULL,
    @DocumentPath NVARCHAR(255) = NULL,
    @WorkshopName NVARCHAR(255) = NULL,
    @WorkshopLocation NVARCHAR(255) = NULL,
    @PasswordHash NVARCHAR(255),
    @Latitude FLOAT,
    @Longitude FLOAT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Users (
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Role,
        Status, 
        QualificationLevel,
        DocumentPath,
        WorkshopName,
        WorkshopLocation,
        PasswordHash,
        Latitude,
        Longitude
    )
    VALUES (
        @FirstName,
        @LastName,
        @Email,
        @PhoneNumber,
        @Role,
        'Waiting', 
        @QualificationLevel,
        @DocumentPath,
        @WorkshopName,
        @WorkshopLocation,
        @PasswordHash,
        @Latitude,
        @Longitude
    );
END;

EXEC CreateUser
    @FirstName = 'John',
    @LastName = 'Doe',
    @Email = 'john.doe@example.com',
    @PhoneNumber = '123-456-7890',
    @Role = 'Carpenter',
    @QualificationLevel = 'Expert',
    @DocumentPath = '/path/to/document.pdf',
    @PasswordHash = 'hashedpassword';


	Select * from Users

    --procedure to get user by email

    CREATE OR ALTER PROCEDURE GetUserByEmail
    @Email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        UserID,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Role,
        Status,
        QualificationLevel,
        DocumentPath,
        WorkshopName,
        WorkshopLocation,
        PasswordHash
    FROM
        Users
    WHERE
        Email = @Email;

END;
EXEC GetUserByEmail @Email = 'john@gmail.com';

--Procedure to get carpenters
CREATE OR ALTER PROCEDURE GetCarpenters
AS
BEGIN
    SELECT
        UserID,
        Email,
        PhoneNumber,
        QualificationLevel,
        CONCAT(FirstName, ' ', LastName) AS FullName
    FROM
        Users
    WHERE
        Role = 'Carpenter';
END;
EXEC GetCarpenters;
 
    CREATE OR ALTER PROCEDURE GetWorkShopOwners
AS
BEGIN
    SELECT
        UserID,
        Email,
        PhoneNumber,
        WorkshopName,
        WorkshopLocation, 
        CONCAT(FirstName, ' ', LastName) AS FullName,
        Latitude,
        Longitude
    FROM
        Users
    WHERE
        Role = 'WorkshopOwner';
END;

EXEC GetWorkShopOwners


--Update Profile 
CREATE PROCEDURE UpdateUserProfile
    @UserID INT,
    @About NVARCHAR(MAX),
    @ProfilePhoto NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET
        About = @About,
        ProfilePhoto = @ProfilePhoto
    WHERE
        UserID = @UserID;
END;

EXEC UpdateUserProfile
    @UserID = 1033, 
    @About = 'New information about the user.',
    @ProfilePhoto = '/path/to/new/profile/photo.jpg';


--Create the procedure to get the user profile
  CREATE OR ALTER PROCEDURE GetUserDetails
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserRole NVARCHAR(50);

  
    SELECT @UserRole = Role
    FROM Users
    WHERE UserID = @UserID;

  
    IF @UserRole = 'Carpenter'
    BEGIN
        SELECT
            UserID,
            FirstName + ' ' + LastName AS FullName,
            Email,
            PhoneNumber,
             About,
            ProfilePhoto,
            QualificationLevel,
            DocumentPath AS QualificationDocument
           
        FROM
            Users
        WHERE
            UserID = @UserID;
    END
    ELSE IF @UserRole = 'WorkshopOwner'
    BEGIN
        SELECT
            UserID,
			FirstName + ' ' + LastName AS FullName,
            Email,
            PhoneNumber,
            About,
            ProfilePhoto,
            WorkshopName,
            WorkshopLocation,
            Latitude,
            Longitude
        FROM
            Users
        WHERE
            UserID = @UserID;
    END;
    
END;

Select * from Users
Exec GetUserDetails @UserID=1039