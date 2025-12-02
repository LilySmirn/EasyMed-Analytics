-- Удаляем старые триггеры (если есть)
DROP TRIGGER IF EXISTS mkbs_set_nosology_before_insert;
DROP TRIGGER IF EXISTS mkbs_set_nosology_before_update;

DELIMITER $$

-- BEFORE INSERT триггер
CREATE TRIGGER mkbs_set_nosology_before_insert
BEFORE INSERT ON mkbs
FOR EACH ROW
BEGIN
    SELECT id INTO NEW.nosology_id
    FROM nosologies
    WHERE NEW.code >= SUBSTRING_INDEX(code, '-', 1)
      AND NEW.code <= SUBSTRING_INDEX(code, '-', -1)
    LIMIT 1;
END$$

-- BEFORE UPDATE триггер
CREATE TRIGGER mkbs_set_nosology_before_update
BEFORE UPDATE ON mkbs
FOR EACH ROW
BEGIN
    IF NEW.code <> OLD.code THEN
        SELECT id INTO NEW.nosology_id
        FROM nosologies
        WHERE NEW.code >= SUBSTRING_INDEX(code, '-', 1)
          AND NEW.code <= SUBSTRING_INDEX(code, '-', -1)
        LIMIT 1;
    END IF;
END$$

DELIMITER ;
