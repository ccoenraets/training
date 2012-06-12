<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/employees', 'getEmployees');
$app->get('/employees/:id',	'getEmployee');
$app->get('/employees/:id/reports',	'getReports');
$app->get('/employees/search/:query', 'findByName');
$app->post('/employees', 'addEmployee');
$app->put('/employees/:id', 'updateEmployee');
$app->delete('/employees/:id', 'deleteEmployee');

$app->run();

function getEmployees() {

    $sql = "select e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " .
    		"from employee e left join employee r on r.managerId = e.id " .
    		"group by e.id order by e.lastName, e.firstName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getEmployee($id) {
    $sql = "select e.id, e.firstName, e.lastName, e.title, e.officePhone, e.cellPhone, e.email, e.managerId, e.twitterId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " .
			"from employee e " .
			"left join employee r on r.managerId = e.id " .
    		"left join employee m on e.managerId = m.id " .
    		"where e.id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$employee = $stmt->fetchObject();
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employee);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employee) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addEmployee() {
	$request = Slim::getInstance()->request();
	$employee = json_decode($request->getBody());
	$sql = "INSERT INTO employee (firstName, lastName, managerId, title, department, officePhone, cellPhone, email, city, twitterId, blogURL, picture) " .
        "VALUES (:firstName, :lastName, :managerId, :title, :department, :officePhone, :cellPhone, :email, :city, :twitterId, :blogURL, :picture)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("firstName", $employee->firstName);
		$stmt->bindParam("lastName", $employee->lastName);
		$stmt->bindParam("managerId", $employee->managerId);
		$stmt->bindParam("title", $employee->title);
		$stmt->bindParam("department", $employee->department);
		$stmt->bindParam("officePhone", $employee->officePhone);
		$stmt->bindParam("cellPhone", $employee->cellPhone);
		$stmt->bindParam("email", $employee->email);
		$stmt->bindParam("city", $employee->city);
		$stmt->bindParam("twitterId", $employee->twitterId);
		$stmt->bindParam("blogURL", $employee->blogURL);
		$stmt->bindParam("picture", $employee->picture);
		$stmt->execute();
		$employee->id = $db->lastInsertId();
		$db = null;
		echo json_encode($employee); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateEmployee($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$employee = json_decode($body);
	$sql = "UPDATE employee SET firstName=:firstName, lastName=:lastName, managerId=:managerId, title=:title, department=:department, officePhone=:officePhone, cellPhone=:cellPhone, email=:email, city=:city, twitterId=:twitterId, blogURL=:blogURL, picture=:picture WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
        $stmt->bindParam("firstName", $employee->firstName);
        $stmt->bindParam("lastName", $employee->lastName);
        $stmt->bindParam("managerId", $employee->managerId);
        $stmt->bindParam("title", $employee->title);
        $stmt->bindParam("department", $employee->department);
        $stmt->bindParam("officePhone", $employee->officePhone);
        $stmt->bindParam("cellPhone", $employee->cellPhone);
        $stmt->bindParam("email", $employee->email);
        $stmt->bindParam("city", $employee->city);
        $stmt->bindParam("twitterId", $employee->twitterId);
        $stmt->bindParam("blogURL", $employee->blogURL);
        $stmt->bindParam("picture", $employee->picture);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($employee); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteEmployee($id) {
	$sql = "DELETE FROM employee WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}




function getReports($id) {

    $sql = "select e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " .
    		"from employee e left join employee r on r.managerId = e.id " .
			"where e.managerId=:id " .
    		"group by e.id order by e.lastName, e.firstName";

    try {
        $db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("id", $id);
    	$stmt->execute();
    	$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function findByName($query) {
    $sql = "select e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " .
    		"from employee e left join employee r on r.managerId = e.id " .
            "WHERE UPPER(CONCAT(e.firstName, ' ', e.lastName)) LIKE :query " .
    		"group by e.id order by e.lastName, e.firstName";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="directory";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>