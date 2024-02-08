
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
    @PasswordHash NVARCHAR(255)
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
        PasswordHash
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
        @PasswordHash
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