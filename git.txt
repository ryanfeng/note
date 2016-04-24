http://www.cnblogs.com/cspku/articles/Git_cmds.html

GIt学习笔记
============================================================
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

初始化
git init
git status 工作区的状态

git diff
		查看修改的内容 http://www.cnblogs.com/wish123/p/3963224.html
		--stat
git diff HEAD -- readme.txt

SSH Key
$ ssh-keygen -t rsa -C "youremail@example.com"

提交
git add . 或者 git add --all/-A 
git add xxx.txt 提交到暂存区
git commit -m  'xxxxxxx' 提交到版本库

版本回退commit：针对提交到版本库的
git reset --hard commit_id 
    reset --hard HEAD^
    reset --hard HEAD^^ 
    reset --hard HEAD～100

git reset HEAD <filename> 把暂存区的修改撤销掉（unstage），重新放回工作区：

git reflog
		可以查看所有分支的所有操作记录（包括（包括commit和reset的操作）

修改回退:
git checkout -- <filename> 

删除（主要可以回退找回）
git rm 'file'

git log：http://www.cnblogs.com/BeginMan/p/3577553.html 
	-n 显示信息数量
	--pretty=oneline 显示方式为一行 
	--abbrev-commit 显示SHA-1的前几个字符，而非所有的40个字符。		
	--stat 显示提交增改行统计信息
	-p 显示比stat还要全，修改详细信息
	--pretty=format:'%h %s' 显示简要提交信息
	--help
	--graph
	--since=2.days 两天前的
	--author
	file 查看某个文件

git tag 查看所有标签 
	tag <tagname> commit-id 创建一个标签(默认为Head)
	tag -m 标签描述
	tag -a <tagname> -m '' 
	tag -s <tagname> -m '' pgp签名
	tag -d <tagname>
	push origin <tagname> 推送一个本地标签；
	push origin --tags 全部
	push origin :refs/tags/<tagname>删除一个远程标签。

链接远端分支
克隆
git clone git@github.com:michaelliao/learngit.git

推送
$ git push -u origin master -u关联远端分支和本地分支
$ git push origin master

分支
git checkout -b dev  -b创建并切换
git branch dev
git checkout dev
git branck 查看当前分支
git branch -d dev 删除

当前分支暂存
git stash 暂停
git stash pop 回复

合并
git checkout master
git merge dev
git log --graph 查看分支合并图
git log --graph --pretty=oneline --abbrev-commit
合并分支禁用Fast forward （这样有合并历史，方便回退）
$ git merge --no-ff -m "merge with no-ff" dev

对人协作
git remote -v 查看远程信息
git remote rm origin 删除远端

创建分支
git checkout -b branch-name origin/branch-name
git branch --set-upstream branch-name origin/branch-name 建立联系
解决冲突 git pull 抓取
git push origin branch-name 
=========================================================