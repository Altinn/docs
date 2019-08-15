param([string]$GitToken = "", [string]$OrgName = "altinnbeta", [string]$RepoName = "docs", [string]$UserEmail = "", [string]$UserName = "", [int]$RunTidy = 0)

cd ..
git clone https://dev.azure.com/brreg/altinn-docs/_git/$RepoName-site 
cd $PSScriptRoot

md ..\gh-pages-$RepoName -Force
cd ..\gh-pages-$RepoName
git init
git remote add origin https://$GitToken@github.com/$OrgName/$RepoName
git pull
git checkout gh-pages

cd $PSScriptRoot
& ..\$RepoName-site\hugo.exe --verbose
cd public

if ($RunTidy -gt 0) {
  Get-ChildItem "*.*" -Depth 10 -Filter *.html |
  Foreach-Object {
    if (!$_.FullName.Contains("slide")) {
      & ..\..\$RepoName-site\tidy.exe --write-back yes --force-output yes --quiet yes --tidy-mark no --output-html yes --indent yes --wrap 0 --drop-empty-elements no --drop-proprietary-attributes no --new-pre-tags section --vertical-space yes --fix-backslash no --lower-literals no --merge-divs no --merge-spans no --merge-emphasis no $_.FullName
    }
  }
}

cd ..\..
Copy-Item -Recurse -Force -Path $PSScriptRoot\public\* -Destination gh-pages-$RepoName

cd gh-pages-$RepoName
git config user.email $UserEmail
git config user.name $UserName
git add --all
git commit -m "Publish to gh-pages"
git push

cd $PSScriptRoot
