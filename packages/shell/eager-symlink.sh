#!/bin/bash

(unlink ./public/mfe-1-v1 || rm -Rf ./public/mfe-1-v1) && cp -R ../remote-mfe-1/dist ./public/mfe-1-v1
(unlink ./public/layout-v1 || rm -Rf ./public/layout-v1) && cp -R ../layout/dist ./public/layout-v1
