# Phone Book
Interact with data storage via flexible JSON:API.

## Installation and Setup

### Database
Configure the `config/database.json` file to be able to use database.
```json
{
  "in_use" : "connection_1_mysql",

  "connection_1_mysql" : {
    "driver"   : "pdo_mysql",
    "host"     : "localhost",
    "port"     : 3306,
    "dbname"   : "phone_book",
    "user"     : "user",
    "password" : "password"
  }
}

```


The only table used in this project:
```sql
create table if not exists contacts(
    id int not null auto_increment primary key,
    first_name varchar(150) not null,
    last_name varchar(150),
    phone_number varchar(50) not null,
    country_code varchar(3),
    timezone varchar(50),
    inserted_on datetime not null,
    updated_on datetime not null
);

```

### Apache
Configure your apache in the following directory `/etc/apache2`.
```apacheconf
<VirtualHost *:80>
    # Instead, you can use localhost
	ServerName phone_book.loc
	DirectoryIndex index.html public/index.html

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/phone_book

	<Directory /var/www/phone_book/>
		Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all				
	</Directory>
	
	# This complexity is for routing sake.
	<Directory /var/www/phone_book/>
		RewriteEngine On
	        RewriteCond %{REQUEST_FILENAME} !-f
	        RewriteCond %{REQUEST_FILENAME} !-d
	        RewriteRule (.*) public/index.php [QSA,L]
	</Directory>

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

```

## Usage
The app is ideally meant to be used via API client (e.g. Postman), but it can be used in the browser as well, although, with some limitations (e.g. pagination, errors are returned, but not displayed).

### API Calls
1. **Create contact** (phone-book record)

**Request**

* Method - _POST_
* Endpoint - _http://example.com/contacts_
* Body
```json

{
  "data": {
    "attributes": {
      "first_name": "Jack",
      "last_name": "Smith",
      "phone_number": "+86 800-555-1234",
      "country_code": "US",
      "timezone": "America/Boise",
      "inserted_on": "",
      "updated_on": ""
    },
    "type": "contacts"
  }
}

```

**Response**
* Status Code - _201_
* Status Message - _Created_
* Body
```json
{
    "data": {
        "id": 13,
        "type": "contacts",
        "attributes": {
            "id": 13,
            "first_name": "Jack",
            "last_name": "Smith",
            "phone_number": "+86 800-555-1234",
            "country_code": "US",
            "timezone": "America/Boise",
            "inserted_on": "2021-06-10 21:59:44",
            "updated_on": "2021-06-10 21:59:44"
        }
    }
}
```

---
2. **Update contact**
   
**Request**

* Method - _PATCH_
* Endpoint - _http://example.com/contacts/{id}_
* Body
```json

{
  "data": {
    "attributes": {
      "first_name": "Jhon",
      "last_name": "Smith",
      "phone_number": "+86 800-555-4321",
      "country_code": "US",
      "timezone": "America/Boise",
      "inserted_on": "2021-06-10 21:59:44",
      "updated_on": "2021-06-10 21:59:44"
    },
    "type": "contacts"
  }
}

```

**Response**
* Status Code - _200_
* Status Message - _OK_
* Body
```json
{
  "data": {
    "id": 13,
    "type": "contacts",
    "attributes": {
      "id": 13,
      "first_name": "Jhon",
      "last_name": "Smith",
      "phone_number": "+86 800-555-4321",
      "country_code": "US",
      "timezone": "America/Boise",
      "inserted_on": "2021-06-10 21:59:44",
      "updated_on": "2021-06-10 22:06:17"
    }
  }
}
```
---
3. **Delete contact**

**Request**

* Method - _DELETE_
* Endpoint - _http://example.com/contacts/{id}_

**Response**
* Status Code - _200_
* Status Message - _OK_
* Body
```json
{
  "data":{
    "id":13,
    "type":"contacts"
  }
}
```

---
4. **Read contact**

**Request**

* Method - _GET_
* Endpoint - _http://example.com/contacts/{id}_

**Response**
* Status Code - _200_
* Status Message - _OK_
* Body
```json
{
    "data": {
        "id": 13,
        "type": "contacts",
        "attributes": {
            "id": 13,
            "first_name": "Jack",
            "last_name": "Smith",
            "phone_number": "+86 800-555-1234",
            "country_code": "US",
            "timezone": "America/Boise",
            "inserted_on": "2021-06-10 21:59:44",
            "updated_on": "2021-06-10 21:59:44"
        }
    }
}
```

---
5. **Read contacts**

**Request**

* Method - _GET_
* Endpoint - _http://example.com/contacts_

**Response**
* Status Code - _200_
* Status Message - _OK_
* Body
```json
{
  "data": [
    {
      "data": {
        "id": 3,
        "type": "contacts",
        "attributes": {
          "id": 3,
          "first_name": "Jimmy",
          "last_name": "Fallon",
          "phone_number": "+991234567890",
          "country_code": "US",
          "timezone": "America/Boise",
          "inserted_on": "2021-06-10 10:11:04",
          "updated_on": "2021-06-10 11:29:26"
        }
      }
    },
    {
      "data": {
        "id": 4,
        "type": "contacts",
        "attributes": {
          "id": 4,
          "first_name": "Jimmy",
          "last_name": "Kimmel",
          "phone_number": "+86 800-555-1234",
          "country_code": "US",
          "timezone": "America/Boise",
          "inserted_on": "2021-06-10 10:34:49",
          "updated_on": "2021-06-10 11:53:17"
        }
      }
    }
  ],
  "links": {
    "self": "http://example.com/contacts",
    "first": "http://example.com/contacts?page%5Bnumber%5D=0&page%5Bsize%5D=2",
    "last": "http://example.com/contacts?page%5Bnumber%5D=4&page%5Bsize%5D=2",
    "prev": "http://example.com/contacts?page%5Bnumber%5D=0&page%5Bsize%5D=2",
    "next": "http://example.com/contacts?page%5Bnumber%5D=1&page%5Bsize%5D=2"
  }
}
```
As you can see the `links` returned are meant for pagination. You can interpret these links based on _json api_ specification https://jsonapi.org/format/#fetching-pagination.

However, the long story shot:
> ?page[size]=2&page[number]=1

the `size` is required to indicate the amount of items per page, while the `number` is an offset. In this specific example we are requiring 2 items from the second page (indexing of pagination starts from 0).

---
5. **Searching contacts based on first and last names**

**Request**

* Method - _GET_
* Endpoint - _http://example.com/contacts?search={value to search}_

**Response**
* Status Code - _200_
* Status Message - _OK_
* Body
```json
{
  "data": [
    {
      "data": {
        "id": 3,
        "type": "contacts",
        "attributes": {
          "id": 3,
          "first_name": "Jimmy",
          "last_name": "Fallon",
          "phone_number": "+991234567890",
          "country_code": "US",
          "timezone": "America/Boise",
          "inserted_on": "2021-06-10 10:11:04",
          "updated_on": "2021-06-10 11:29:26"
        }
      }
    },
    {
      "data": {
        "id": 4,
        "type": "contacts",
        "attributes": {
          "id": 4,
          "first_name": "Jimmy",
          "last_name": "Kimmel",
          "phone_number": "+86 800-555-1234",
          "country_code": "US",
          "timezone": "America/Boise",
          "inserted_on": "2021-06-10 10:34:49",
          "updated_on": "2021-06-10 11:53:17"
        }
      }
    }
  ],
  "links": {
    "self": "http://example.com/contacts?search=Ji",
    "first": "http://example.com/contacts?search=Ji&page%5Bnumber%5D=0&page%5Bsize%5D=2",
    "last": "http://example.com/contacts?search=Ji&page%5Bnumber%5D=4&page%5Bsize%5D=2",
    "prev": "http://example.com/contacts?search=Ji&page%5Bnumber%5D=0&page%5Bsize%5D=2",
    "next": "http://example.com/contacts?search=Ji&page%5Bnumber%5D=1&page%5Bsize%5D=2"
  }
}
```
Now you should notice that records are returned based on search criterion (i.e. Ji) and pagination options (i.e. 2 items from the first page). 

This search criterion is being matched ,rather than compared, against first and last names like so:
```dockerfile
$this->createQueryBuilder('c')
    ->select('c')
    ->where("c.firstName LIKE :value")
    ->orWhere("c.lastName LIKE :value")
    ->setParameter('value', "%" . $value . "%")
    ->setFirstResult($offset)
    ->setMaxResults($limit)
    ->getQuery()
    ->getResult();
```
---
6. **Error detection**

* If the endpoint is not found:
```json
{"status":"404","title":"Not Found"}
```

* If the method (http verb) is not supported:
```json
{
    "status": "405",
    "title": "Method Not Allowed",
    "errors": {
        "message": "Wrong method, try these instead: GET,POST"
    }
}
```

* If there is any error detected while validating the fields:
```json
{
    "status": "422",
    "title": "Unprocessable Entity",
    "errors": {
        "first_name": [
            "Field should not be blank."
        ],
        "phone_number": [
            "Field should not be blank.",
            "Wrong format."
        ],
        "country_code": [
            "Wrong country code."
        ],
        "timezone": [
            "Wrong timezone."
        ]
    }
}
```