#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process')

const caPath = process.argv[2]
const caDest = process.argv[3]

console.log('Enrolling the CA admin');

const binCAClient = path.join('bin', 'fabric-ca-client')
cp.execSync(`${binCAClient} enroll -H ${caDest} -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${caPath}/ca-cert.pem"`)

const nodeUS = `NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer`
fs.writeFileSync(`${caDest}/msp/config.yaml`, nodeUS, 'utf-8')

if(!fs.existsSync()) {
    fs.mkdirSync(`${caDest}/msp/tlscacerts`)
}
fs.copyFileSync(`${caPath}/ca-cert.pem`, `${caDest}/msp/tlscacerts/tlsca.zillabc.io-cert.pem`)

if(!fs.existsSync()) {
    fs.mkdirSync(`${caDest}/tlsca`)
}
fs.copyFileSync(`${caPath}/ca-cert.pem`, `${caDest}/tlsca/tlsca.zillabc.io-cert.pem`)

console.log('Registering orderer');
cp.execSync(`${binCAClient} register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles ${caPath}/ca-cert.pem`)

console.log('Registering the orderer admin');
cp.execSync(`${binCAClient} register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles ${caPath}/ca-cert.pem`)

console.log('Generating the orderer msp');
cp.execSync(`${binCAClient} enroll -H ${caDest} -u https://admin:adminpw@localhost:9054 --caname ca-orderer -M "${caDest}/orderers/orderer.zillabc.io/msp"  --tls.certfiles "${caPath}/ca-cert.pem"`)

fs.copyFileSync(`${caDest}/msp/config.yaml`, `${caDest}/orderers/orderer.zillabc.io/msp/config.yaml`)
