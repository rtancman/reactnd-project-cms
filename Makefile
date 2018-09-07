setup:
	yarn install
	cd api-server && yarn install
	cp sample-env .env

run: run.apiserver run.client 

run.apiserver:
	cd api-server && yarn start &

run.client:
	yarn start

chrome.debugmode:
	google-chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chre-remote_data_dir')