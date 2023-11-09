# Pequeno ejemplo de auth para apigeway usando una lambda

Esto es lo que devuelve el evento

```
{
    "type": "TOKEN",
    "methodArn": "arn:aws:execute-api:us-east-1:${account}:zprvh8dapj/prod/GET/call",
    "authorizationToken": "abc"
}
```
