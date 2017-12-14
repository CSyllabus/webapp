<?php 

require 'vendor/autoload.php';

define("CLIENT_ID", "Hello world.");
define("CLIENT_SECRET", "Hello world.");

// Make a request to the GitHub API with a custom
// header of "X-Trvial-Header: Just as a demo".

$url = "http://localhost:8000/csyllabusapi/courses?format=json";
$response = \Httpful\Request::get($url)
    ->addHeader('Authorzation', 'Bearer -token-')
    ->send();
	
	
	$url = "http://localhost:8000/api-token-auth/?format=json";
 $response = \Httpful\Request::post($url)
    ->body('{
                "email": "emanuel.guberovic@gmail.com",
                "password": "Password1!"
            }')
    ->sendsJson()
	->send();
	
$token = json_decode($response)->token;

 
 $url = "http://localhost:8000/csyllabusapi/courses";
 $response = \Httpful\Request::post($url)
    ->body('{
                "description": "Reti di calcolatori Evolute: Architetture:The module presents the architectures, protocols and services of the current and future telecommunication networks. After introducing the requirements (bandwidth, real time, etc.) of voice, data and video and a brief description of the legacy PSTN (TDM) infrastructures ( originally designed only for phone services),  the main features of an integrated multiservice IP-based backbone are described. Such IP based architecture is a essential  element  for the growing digital services and applications (i.e. web 2.0, cloud computing, big data, etc.)  Among the various access networks the fixed access (i.e. ADSL, NGAN-fiber based, etc.) and mobile and wireless access are covered. Regarding the mobile technologies, the course presents the evolution from GSM/GPRS/EDGE to 3G systems (UMTS/HSPA) up to 4G-LTE architectures, services and applications. For the local environments wired (LAN) and wireless (WiFi) standards are described including the upcoming wifi-mobile integration.",
                "ects": "12",
                "country": "Italy",
                "university": "University of LAquila",
                "semester": "1",
                "english_level": null,
                "name": "Advanced Computer Networks"
            }')
    ->sendsJson()
	->addHeader('Authorization', 'JWT ' . $token . ' ')
    ->send();
	
echo "{$response}";

?>