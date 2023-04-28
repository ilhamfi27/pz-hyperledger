#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process')

const caPath = process.argv[2]
const caDest = process.argv[3]

const faBin = path.join('bin', 'fabric-ca-client')
cp.execSync(`${faBin} enroll -H ${caDest} -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${caPath}/ca-cert.pem"`)
