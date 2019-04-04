shell: ## run a shell on the learner-portal container
	docker exec -it /bin/bash

build:
	docker-compose build

up: ## bring up learner-portal container
	docker-compose up

up-detached: ## bring up clearner-portal container in detached mode
	docker-compose up -d

logs: ## show logs for learner-portal container
	docker-compose logs -f

down: ## stop and remove learner-portal container
	docker-compose down

npm-install-%: ## install specified % npm package on the learner-portal container
	docker exec npm install $* --save-dev
	git add package.json

restart:
	make down
	make up

restart-detached:
	make down
	make up-detached

validate-no-uncommitted-package-lock-changes:
	git diff --name-only --exit-code package-lock.json
