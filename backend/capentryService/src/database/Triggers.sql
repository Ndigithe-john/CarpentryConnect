--Trigger to update name on the table 
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

--Trigger to update the job status
CREATE TRIGGER UpdateJobStatus
ON WorkRequests
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Status)
    BEGIN
        -
        UPDATE wr
        SET wr.Status = 'Rejected'
        FROM WorkRequests wr
        INNER JOIN inserted i ON wr.ItemID = i.ItemID
        WHERE i.Status = 'Approved' AND wr.RequestID <> i.RequestID;
    END;
END;