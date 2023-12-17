#!/bin/bash

(unlink ./public/remote-mfe-1-0.0.0 || rm -Rf ./public/remote-mfe-1-0.0.0) && cp -R ../remote-mfe-1/dist ./public/remote-mfe-1-0.0.0
(unlink ./public/layout-0.0.0 || rm -Rf ./public/layout-0.0.0) && cp -R ../layout/dist ./public/layout-0.0.0
