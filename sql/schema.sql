DROP TABLE IF EXISTS rankings;

CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    overall_score INT NOT NULL,
    `rank` INT NOT NULL,  -- Backticks around 'rank'
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE INDEX idx_overall_score ON rankings (overall_score DESC);

DELIMITER //

DROP TRIGGER IF EXISTS update_rankings //

CREATE TRIGGER update_rankings
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DECLARE overall INT;

    SET overall = (NEW.crisis_management + NEW.sustainability + NEW.team_motivation) DIV 3;

    INSERT INTO rankings (candidate_id, overall_score, `rank`)
    VALUES (NEW.candidate_id, overall, 0)
    ON DUPLICATE KEY UPDATE overall_score = overall;

    SET @rnk := 0;
    UPDATE rankings
    SET `rank` = (@rnk := @rnk + 1)
    ORDER BY overall_score DESC;
END //

DELIMITER ;