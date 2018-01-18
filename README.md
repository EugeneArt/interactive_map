# Sputnik

## Guide for HORIZONT developers

## About

* App consists into two parts: Django and Angularjs;
* DB: MySQL;

## Installing
### Client
__open folder client and make instructions:__
* install all required packages;
```javascript
  npm install
```
* run dev server;
```javascript
  gulp serve
```
* build for  production;
```javascript
  gulp default
```
#### Options
* Path to API in client, floor id and duration advertisement you can find:;
**__client/src/config.locale.js__

### Server
__open root folder and make instructions:__
*  __activate virtual environment__;
** in interactive_map folder enter this code:
```python
  source venv/bin/activate
```
** then you should see (venv) in console
*__install all requirements__;
** change directory to interactive_map, write follow commands in console:
```python
  pip install -r requirements.txt
```
* __change directory to imap and write follow commands, where IP: your computer IP and port(for example 8000)__:
```python
  python manage.py runserver IP:PORT
```
#### Options
* Path to change db options and others you can find:;
**__imap/imap/settings.py__


## Authors
__*Eugene Artsiukhevich*__
