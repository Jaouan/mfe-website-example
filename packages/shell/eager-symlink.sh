#!/bin/bash

(unlink ./public/remote-mfe-basic-0.0.0 || rm -Rf ./public/remote-mfe-basic-0.0.0) && cp -R ../remote-mfe-basic/dist ./public/remote-mfe-basic-0.0.0
(unlink ./public/remote-mfe-subroutes-0.0.0 || rm -Rf ./public/remote-mfe-subroutes-0.0.0) && cp -R ../remote-mfe-subroutes/dist ./public/remote-mfe-subroutes-0.0.0
(unlink ./public/layout-0.0.0 || rm -Rf ./public/layout-0.0.0) && cp -R ../layout/dist ./public/layout-0.0.0
