from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists


env.use_ssh_config = True
env.hosts = ['{%= server %}']
REPO = '{%= repo %}'
DEST = 'projects/{%= name %}'


@task(default=True)
def deploy():
	if exists(DEST):
		with cd(DEST):
			run('git checkout master')
			run('git pull')
	else:
		setup()
{% if (upgrade) { %}


@task
def upgrade():
	with cd(DEST):
		run('git checkout master')
		run('git pull'){% if (grunt) { %}
		run('npm update npm -g')
		run('npm update grunt -g')
		run('npm update'){% } %}{% } %}


@task
def setup():{% if (kind === 'bare') { %}
	if exists(REPO + '/config'):
		return
	run('mkdir -p %s' % REPO)
	with cd(REPO):
		run('git --bare init')
		run('git config core.sharedrepository 1')
		run('git config receive.denyNonFastforwards true')
	remote = 'ssh://%s@%s/~/%s' % (env['user'], env['host'], REPO)
	local('git remote add origin %s' % remote)
	local('git push -u origin master'){% } %}
	with cd(DEST):
		run('git clone %s .' % REPO){% if (upgrade) { %}
	upgrade(){% } %}
