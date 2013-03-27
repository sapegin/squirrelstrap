from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists


env.use_ssh_config = True
env.hosts = ['{%= server %}']
REPO = '{%= repo %}'
DEST = 'sites/{%= name %}'


@task(default=True)
def deploy():
	if exists(DEST):
		with cd(DEST):
			run('git checkout master')
			run('git pull'){% if (grunt) { %}
			run('grunt deploy'){% } %}
	else:
		abort('Destination directory not found.')
{% if (upgrade) { %}


@task
def upgrade():
	with cd(DEST):
		run('git checkout master')
		run('git pull'){% if (grunt) { %}
		run('npm update npm -g')
		run('npm update grunt-cli -g')
		run('npm update'){% } %}{% } %}
